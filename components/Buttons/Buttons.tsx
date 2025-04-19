"use server";

type PropsType = {
  label: string;
  action: () => Promise<void>;
  frontIcon: React.ReactNode;
};

const Buttons = ({ label, action, frontIcon }: PropsType) => {
  return (
    <form action={action}>
      <button
        type="submit"
        className="flex items-center text-red-500 gap-x-1 cursor-pointer"
      >
        {frontIcon}
        {label}
      </button>
    </form>
  );
};

export default Buttons;
