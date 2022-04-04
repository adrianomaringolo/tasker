import { SITE_TITLE } from "../../constants/constants";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white text-center py-4">
      <p className="mb-1">{SITE_TITLE} &copy;</p>
    </footer>
  );
};

export default Footer;
