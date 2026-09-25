import Card from "@/component/Card";
import HomeBanner from "@/component/HomeBanner";
import Image from "next/image";
const getData = async () => {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog')
  return res.json()
}
export default async function Home() {
  const data = await getData();
  return (
    <div>
      <HomeBanner />

      <div className="w-[95%] mx-auto mb-5">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">THE LIBRARY</h1>
        <p className="mt-2 text-neutral-400">Twelve lifts covering every major muscle group.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-[95%] mx-auto">
        {data.slice(0, 4).map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
