

export default function ProductCard() {
  return (
    <>
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Name of dish
    </h5>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Description
    </p>
    <button
    type="button"
    className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    data-twe-ripple-init
    data-twe-ripple-color="light">
        Order
    </button>
</div>
</>
  )
}
