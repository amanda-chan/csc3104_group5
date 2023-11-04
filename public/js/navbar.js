document.write(
    `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>

    <!-- CDN for boostrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- link for Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/navbar.css">
 
 
</head>
<body>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid" id="navContainer">
            <a class="navbar-brand" href="#">CROWD FUNDING</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarText">
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" id="option" aria-current="page" href="/creator/dashboard">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="option" href="/creator/dashboard">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="option" href="/creator/donation">Donation</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="option" href="/creator/add_campaign">New Campaign</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="option" href="/creator/withdraw_request">Withdraw Request</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="option" href="/creator/withdraw">Withdraw Campaign</a>
                </li>
            </ul>
            
            </div>
            <span class="navbar-item">
                <a href="/metamask">Logout</a>
            </span> 
            
        </div>
    </nav>
    `
    );