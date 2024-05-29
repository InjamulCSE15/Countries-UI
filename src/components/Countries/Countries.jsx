import { useEffect, useState } from "react"
import Country from "../Country/Country";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [alertMsg, setAlertMsg] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [clearBtn, setClearBtn] = useState(false);

    const searchCountry = (e) => {
        const search = e.target.value;
        setSearchQuery(search);
        if (search == null || search == '') {
            setClearBtn(false);
            setAlertMsg(false);
        }
        if (search.length > 2) {
            setClearBtn(true);
            const filtered = countries.filter(c =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCountries(filtered);
            if (filteredCountries.length == 0) {
                setAlertMsg(true);
            }
        }
        else {
            setFilteredCountries(countries);
        }
    }

    const clearSearch = () => {
        setAlertMsg(false);
        setClearBtn(!clearBtn);
        setSearchQuery("");
        setFilteredCountries(countries);
    }

    const visitedCountry = country => {
        const visitedList = [...visitedCountries, country];
        setVisitedCountries(visitedList);
    }

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setCountries(data);
                setFilteredCountries(data);
            }
            ).catch(
                error => {
                    setLoading(false); 
                    setAlertMsg(true); 
                    console.log("Error fetching country data", error);
                }
            )
    }, [])


    return (
        <div className="container mx-auto">
            {isLoading ?
                (<div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
                </div>)
                : ''
            }
            <div className="flex flex-wrap items-center my-6">
                <h3 className="font-semibold text-xl lg:w-1/3 p-2 ">Total Countries:
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 ml-2 text-purple-700">
                        {filteredCountries.length}
                    </span>
                </h3>

                <div className="lg:flex lg:w-1/3 w-full p-2">
                    <input
                        type="text"
                        id="Search"
                        value={searchQuery}
                        placeholder="Country name" onChange={searchCountry}
                        className="w-full rounded-md border-gray-200 py-2.5 px-5 shadow-sm sm:text-sm focus:border-sky-500"
                    />
                    {clearBtn ?
                        (<button className="ml-1 group relative inline-flex items-center overflow-hidden rounded bg-red-600 px-6 py-2.5 text-white focus:outline-none focus:ring active:bg-red-500" onClick={clearSearch}>
                            <span className="absolute -start-full transition-all group-hover:start-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium transition-all group-hover:ms-4"> Clear </span>
                        </button>) : ''
                    }
                </div>
                <h3 className=" font-semibold text-xl lg:w-1/3 p-2 lg:text-end">Visited Countries:
                    <span className="whitespace-nowrap rounded-full bg-sky-100 px-2.5 py-0.5 ml-2 text-sky-700">
                        {visitedCountries.length}
                    </span>
                </h3>
            </div>

            {alertMsg ?
                (<div className="flex my-3 justify-center">
                    <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                        <div className="flex items-center gap-2 text-red-800">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <strong className="block font-medium"> No data found </strong>
                        </div>

                        <p className="mt-2 text-sm text-red-700">
                            Clear the data and search again!
                        </p>
                    </div>
                </div>)
                : ''}

            <div className={`${visitedCountries.length == 0 ? 'hidden' : ''}`}>
            <h3 className="font-medium text-xl">Countries that I have visited</h3>
            <div className="flex flex-wrap gap-4 py-3 justify-center text-lg">
                {
                    visitedCountries.map(
                        country => (
                               <div key={country.cca3} className="bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12">
                                    <div className="flex justify-between text-gray-900 text-sm pt-1">
                                        <h6 className="font-medium">{country.name.common}</h6>
                                        <h6>Area: {country.area}</h6>
                                    </div>

                                    <div className="flex justify-between text-gray-900 text-sm pt-1">
                                    <h6 className="text-sm">{country.capital}</h6>
                                        <h6>Population: {country.population}</h6>
                                    </div>
                                </div>
                            )                        
                    )
                }
            </div>
            </div>
            <div className="grid grid-cols-1 gap-4 m-1 lg:grid-cols-4">
                {
                    filteredCountries.map(country => <Country key={country.cca3} visitedCountry={visitedCountry} country={country} />)
                }
            </div>
        </div>
    )
}
