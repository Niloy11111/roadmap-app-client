const Button = ({ title }) => {
  return (
    <button
      className={`bg-b1 text-t1 uppercase ${
        title === "Book a Table" ? "py-2.5" : "py-3"
      } px-5 lg:px-6 font-Roboto font-bold leading-6`}
    >
      {title}
    </button>
  );
};

export default Button;
