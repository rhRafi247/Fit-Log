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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-[95%] mx-auto">
        {data.slice(0, 4).map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
