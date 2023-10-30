// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Project {
    // Project state
    enum State {
        Fundraising,
        Successful
    }

    // Structs
    struct WithdrawRequest {
        string description;
        uint256 amount;
        uint256 noOfVotes;
        mapping(address => bool) voters;
        bool isCompleted;
        address payable recipient;
    }

    // Variables
    address payable public creator;
    uint256 public targetContribution;
    uint256 public raisedAmount = 0;
    uint256 public noOfContributors;
    string public projectTitle;
    string public projectDes;
    State public state = State.Fundraising;
    mapping(address => uint) public contributors;
    mapping(uint256 => WithdrawRequest) public withdrawRequests;
    uint256 public numOfWithdrawRequests = 0;

    // Modifiers
    modifier isCreator() {
        require(msg.sender == creator, 'Only the creator can perform this operation!');
        _;
    }

    // Events
    event FundingReceived(address contributor, uint amount, uint currentTotal);
    event WithdrawRequestCreated(uint256 requestId, string description, uint256 amount, address recipient);
    event WithdrawVote(address voter, uint256 requestId);
    event AmountWithdrawSuccessful(uint256 requestId, uint256 amount, address recipient);

    constructor(address _creator, uint256 _targetContribution, string memory _projectTitle, string memory _projectDes) {
        creator = payable(_creator);
        targetContribution = _targetContribution;
        projectTitle = _projectTitle;
        projectDes = _projectDes;
    }

    function contribute(address _contributor) public payable {
    require(state == State.Fundraising, 'Cannot contribute at this stage!');
    if(contributors[_contributor] == 0) {
        noOfContributors++;
    }
    contributors[_contributor] += msg.value;
    raisedAmount += msg.value;
    
    // Check if the fundraising goal has been met or exceeded
    if(raisedAmount >= targetContribution){
        state = State.Successful; // Transition to Successful state
    }

    emit FundingReceived(_contributor, msg.value, raisedAmount);
}


    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function createWithdrawRequest(string memory _description, uint256 _amount) public isCreator() {
        WithdrawRequest storage newRequest = withdrawRequests[numOfWithdrawRequests];
        numOfWithdrawRequests++;
        newRequest.description = _description;
        newRequest.amount = _amount;
        newRequest.recipient = creator;
        emit WithdrawRequestCreated(numOfWithdrawRequests, _description, _amount, creator);
    }

    function voteWithdrawRequest(uint256 _requestId) public {
        require(contributors[msg.sender] > 0, 'Only contributors can vote!');
        WithdrawRequest storage requestDetails = withdrawRequests[_requestId];
        require(requestDetails.voters[msg.sender] == false, 'You already voted!');
        requestDetails.voters[msg.sender] = true;
        requestDetails.noOfVotes += 1;
        emit WithdrawVote(msg.sender, _requestId);
    }

    function withdrawRequestedAmount(uint256 _requestId) isCreator() public {
        WithdrawRequest storage requestDetails = withdrawRequests[_requestId];
        require(requestDetails.isCompleted == false, 'Request already completed');
        require(requestDetails.noOfVotes >= noOfContributors/2, 'At least 50% contributors need to vote for this request');
        requestDetails.recipient.transfer(requestDetails.amount);
        requestDetails.isCompleted = true;
        emit AmountWithdrawSuccessful(_requestId, requestDetails.amount, requestDetails.recipient);
    }

    function getProjectDetails() public view returns(
        address payable projectStarter,
        uint256 goalAmount,
        uint256 currentAmount,
        string memory title,
        string memory desc,
        State currentState,
        uint256 balance
    ) {
        projectStarter = creator;
        goalAmount = targetContribution;
        currentAmount = raisedAmount;
        title = projectTitle;
        desc = projectDes;
        currentState = state;
        balance = address(this).balance;
    }
}