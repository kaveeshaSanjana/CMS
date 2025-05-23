
function Footer() {

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
                <div class="container">
                    <a class="navbar-brand fw-bold text-warning" href="#">
                        <i class="fas fa-hands-helping me-2"></i>Cause Management
                    </a>
                    <button class="navbar-toggler border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link active text-warning fw-semibold" href="#"><i class="fas fa-home me-1"></i> Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="#features"><i class="fas fa-list-check me-1"></i> Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="#roles"><i class="fas fa-users me-1"></i> Roles</a>
                            </li>
                            <li class="nav-item ms-lg-3">
                                <a class="btn btn-warning text-dark fw-bold" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                                    <i class="fas fa-sign-in-alt me-1"></i> Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="text" />
            </nav>

        </>
    )
}


export default Footer;
