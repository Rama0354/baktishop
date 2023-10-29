"use client";

type CountCartProps = {
  scale?: number;
  count: number;
  setCount: (count: number) => void;
};

const CountCart = ({ scale, count, setCount }: CountCartProps) => {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div
      className={`w-48 ${
        scale ? "scale-0 md:scale-" + scale : ""
      } grid grid-cols-3 border border-slate-200 rounded-lg`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        className="bg-slate-200 text-slate-600 font-bold text-xl"
      >
        -
      </button>
      <input
        type="text"
        value={count}
        readOnly
        className="appearance-none text-slate-600 text-center font-bold text-lg p-1 pointer-events-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="bg-slate-200 text-slate-600 font-bold text-xl"
      >
        +
      </button>
    </div>
  );
};

export default CountCart;
