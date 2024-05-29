import { useState } from "react";

export default function Country({ country, visitedCountry }) {
    const { name, flags, area, population, capital, region, independent } = country;
    const [visited, setVisited] = useState(false);
    const handleVisited = () => { setVisited(!visited); }
    return (
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow transition hover:shadow-xl">
            <img
                alt={flags.alt}
                src={flags.png}
                className="h-56 w-full object-cover"
            />

            <div className={`p-4 sm:p-6 ${visited ? 'bg-stone-200' : 'bg-white'}`}>
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h6 className="flex items-center mt-0.5 text-lg font-medium text-gray-900">{name.common}
                            {
                                independent ? 
                                (<span className=" m-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                </span>) : ''
                            }
                        </h6>
                        <h6 className="mt-0.5 text-sm font-medium text-gray-500">{capital}</h6>
                        <small className="text-green-500 font-medium">{visited ? 'I have visited.' : ''}</small>
                    </div>
                    <div>
                        <h6 className="text-xs text-gray-700"> Area: {area} </h6>
                        <h6 className="flex text-xs text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            <span className="pl-2">{population}</span>
                        </h6>
                        <h6 className="text-xs text-gray-700"> Region: {region} </h6>
                    </div>
                </div>
                <div className="flex justify-between gap-x-2">
                    <button className="mt-4 w-full inline-block rounded border border-indigo-600 bg-indigo-600 px-3 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={handleVisited}>{visited ? 'Visited' : 'Going'}</button>            
                    <button className="mt-4 w-full inline-block rounded border border-indigo-600 bg-white px-3 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:text-white" onClick={()=> visitedCountry(country)}>Mark visited</button>            
                </div>
            </div>
        </div>
    )
}
