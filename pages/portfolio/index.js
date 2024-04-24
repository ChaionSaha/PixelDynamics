import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Portfolio = ({ portfolios = [], categories = [], subCategories = [] }) => {
    const router = useRouter();
    const [subCats, setSubCats] = useState(subCategories);
    const [selectedMainCat, setSelectedMainCat] = useState("");
    const [selectedSubCat, setSelectedSubCat] = useState("");
    const [catPortfolios, setCatPortfolios] = useState(portfolios);

    useEffect(() => {
        if (selectedMainCat === '')
            setCatPortfolios(portfolios);
        else {
            if (selectedSubCat === '')
                setCatPortfolios(portfolios.filter((pf) => pf.mainCat === selectedMainCat));
            else
                setCatPortfolios(portfolios.filter((pf) => pf.mainCat === selectedMainCat && pf.subCat === selectedSubCat));
        }
    }, [selectedMainCat, portfolios, selectedSubCat])



    return (
        <SharedLayout>
            <div className="relative">
                <div className="absolute right-0 lg:w-[25%] md:w-[30%] w-[70%] flex gap-x-3 justify-end h-fit p-5 z-[100]">
                    <select
                        onChange={(e) => {
                            setSelectedMainCat(e.target.value);
                            setSelectedSubCat('');
                            setSubCats(subCategories.filter((sc) => sc.mainCatValue === e.target.value));
                        }}
                        value={selectedMainCat}
                        className="select select-sm  w-[50%] focus:outline-0 rounded-none bg-[#858991] border-[#858991] focus:border-[#858991] text-white"
                    >
                        <option className="rounded-none" value="" >
                            All
                        </option>
                        {categories.map((c, i) => (
                            <option className="rounded-none" key={i} value={c.value}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {selectedMainCat !== "" && (
                        <select
                            onChange={(e) => setSelectedSubCat(e.target.value)}
                            value={selectedSubCat}
                            className="select select-sm w-[50%] focus:outline-0 rounded-none bg-[#858991] border-[#858991] focus:border-[#858991] text-white "
                        >
                            <option value="" >
                                All
                            </option>
                            {subCats.map((c, i) => (
                                <option key={i} value={c.value}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <Title title="Portfolio" />
                {catPortfolios.map((p, i) => (
                    <div
                        onClick={() => router.push(`/portfolio/${p.pfid}`)}
                        key={i}
                        className="w-full overflow-hidden relative lg:h-[50vh] h-[33vh] cursor-pointer"
                    >
                        <Image
                            fill
                            quality={100}
                            src={p.profileImage}
                            alt={p.name}
                            className="object-cover hover:scale-[1.05] duration-300"
                        />
                    </div>
                ))}
            </div>
        </SharedLayout>
    );
};

export default Portfolio;

export async function getServerSideProps({ req, res }) {
    const db = await getDatabase();
    const portfolios = await db
        .collection("portfolio")
        .find()
        .project({ _id: 0 })
        .toArray();
    portfolios.sort((a, b) => +a.position - +b.position);
    const categories = await db
        .collection("category")
        .find()
        .project({ _id: 0 })
        .toArray();
    const subCategories = await db
        .collection("subCategory")
        .find()
        .project({ _id: 0 })
        .toArray();

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );

    return {
        props: {
            portfolios,
            categories,
            subCategories,
        },
    };
}
