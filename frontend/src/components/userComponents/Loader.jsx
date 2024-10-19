import { FallingLines } from "react-loader-spinner";
function Loader() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <FallingLines
        color="#201B6B"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
}

export default Loader;
