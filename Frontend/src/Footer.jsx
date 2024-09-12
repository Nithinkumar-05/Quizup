import { Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer className="m-0 bottom-0 left-0 w-full bg-gray-800 text-white py-4 hidden md:block">
      <Container maxWidth="md">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section: Logo or Brand Name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Typography variant="h6" component="div" className="font-bold text-gray-300">
              EdQuiz
            </Typography>
            <Typography variant="body2" className="mt-2 text-gray-400">
              A quiz platform
            </Typography>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-8 mb-4 md:mb-0 text-center md:text-left">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="#" className="hover:text-gray-400">
              About
            </Link>
            <Link href="#" className="hover:text-gray-400">
              Services
            </Link>
            <Link href="#" className="hover:text-gray-400">
              Contact
            </Link>
          </div>

          {/* Right Section: Social Media Links */}
          <div className="flex space-x-4 justify-center">
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-center">
          <Typography variant="body2" className="text-gray-400">
            © {new Date().getFullYear()} EdQuiz. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
