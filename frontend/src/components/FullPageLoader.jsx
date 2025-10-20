import MoonLoader from "react-spinners/MoonLoader";

export default function FullPageLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <MoonLoader color="#ffffff" size={70} />
    </div>
  );
}
