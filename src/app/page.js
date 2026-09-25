import { Suspense } from 'react';
import Card from "@/component/Card";
import HomeBanner from "@/component/HomeBanner";
import ExerciseLoading from "@/component/ExerciseLoading";

const getData = async () => {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch exercises: ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching home page exercises:', error);
    return [];
  }
};

async function ExerciseList() {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <div className="w-[95%] mx-auto py-12 text-center text-neutral-400">
        <p className="text-sm">Unable to load exercises at the moment. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-[95%] mx-auto">
      {data.slice(0, 4).map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="pb-16">
      <HomeBanner />

      <div className="w-[95%] mx-auto mb-5">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">THE LIBRARY</h1>
        <p className="mt-2 text-neutral-400">Twelve lifts covering every major muscle group.</p>
      </div>

      <Suspense fallback={<ExerciseLoading />}>
        <ExerciseList />
      </Suspense>
    </div>
  );
}
