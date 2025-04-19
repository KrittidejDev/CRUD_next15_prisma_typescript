type PropsType = {
  color?: string;
  width?: number;
  height?: number;
};

const IconsTrash = ({
  width = 25,
  height = 24,
  color = "#8C9E9E",
}: PropsType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.29 3.29L16 4H18.5C19.05 4 19.5 4.45 19.5 5C19.5 5.55 19.05 6 18.5 6H6.5C5.95 6 5.5 5.55 5.5 5C5.5 4.45 5.95 4 6.5 4H9L9.71 3.29C9.89 3.11 10.15 3 10.41 3H14.59C14.85 3 15.11 3.11 15.29 3.29ZM6.5 19C6.5 20.1 7.4 21 8.5 21H16.5C17.6 21 18.5 20.1 18.5 19V9C18.5 7.9 17.6 7 16.5 7H8.5C7.4 7 6.5 7.9 6.5 9V19ZM9.5 9H15.5C16.05 9 16.5 9.45 16.5 10V18C16.5 18.55 16.05 19 15.5 19H9.5C8.95 19 8.5 18.55 8.5 18V10C8.5 9.45 8.95 9 9.5 9Z"
        fill={color}
      />
    </svg>
  );
};

export default IconsTrash;
