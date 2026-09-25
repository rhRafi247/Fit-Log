import React from 'react';
const getData = async (id) => {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
    
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    
    return res.json();
}

const Page = async ({ params }) => {
    const { id } = await params;

    const item = await getData(id);

    return (
        <div>
            <h2>{item?.name}</h2>
        </div>
    );
}

export default Page;