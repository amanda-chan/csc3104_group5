// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import './Project.sol';

contract Crowdfunding {
    event ProjectStarted(address indexed projectContractAddress, address indexed creator, uint256 goalAmount, string title, string desc);
    event ContributionReceived(address indexed projectAddress, uint256 contributedAmount, address indexed contributor);

    Project[] private projects;

    function createProject(uint256 targetContribution, string memory projectTitle, string memory projectDesc) public {
        Project newProject = new Project(msg.sender, targetContribution, projectTitle, projectDesc);
        projects.push(newProject);
        emit ProjectStarted(address(newProject), msg.sender, targetContribution, projectTitle, projectDesc);
    }

    function returnAllProjects() external view returns(Project[] memory) {
        return projects;
    }

    function contribute(address _projectAddress) public payable {
        Project project = Project(_projectAddress);
        require(project.state() == Project.State.Fundraising, 'Invalid state');
        project.contribute{value: msg.value}(msg.sender);
        emit ContributionReceived(_projectAddress, msg.value, msg.sender);
    }

    
}