import { BlogIcon, PortfolioIcon, ServicesIcon, TeamIcon } from "@/assets/CustomIcons/CustomIcon";
import Link from "next/link";
import { useRouter } from "next/router";

function ClientSidebarLinks() {
    const router = useRouter();

    return (
        <>
            <li>
                <Link
                    href={'/portfolio'}
                    className={`flex items-center gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 group ${
                        router.asPath.includes('/portfolio') ? 'sidebar-link-active' : ''
                    }`}
                    scroll={false}
                >
                    <PortfolioIcon className={`w-5 h-5 group-hover:fill-black ${router.asPath.includes('/portfolio') ? 'fill-black' : 'fill-white'}`}/>
                    <p>Portfolio</p>
                </Link>
            </li>
            <li>
                <Link
                    href={'/services'}
                    className={`flex items-center gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 group ${
                        router.asPath.includes('/services') ? 'sidebar-link-active' : ''
                    }`}
                    scroll={false}
                >
                    <ServicesIcon className={`w-5 h-5 group-hover:fill-black ${router.asPath.includes('/services') ? 'fill-black' : 'fill-white'}`} />
                    <p>Services</p>
                </Link>
            </li>
            <li>
                <Link
                    href={'/team'}
                    className={`flex items-center gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 group ${
                        router.asPath.includes('/team') ? 'sidebar-link-active' : ''
                    }`}
                    scroll={false}
                >
                    <TeamIcon className={`w-5 h-5 group-hover:fill-black ${router.asPath.includes('/team') ? 'fill-black' : 'fill-white'}`} />
                    <p>Team</p>
                </Link>
            </li>
            <li>
                <Link
                    href={'/blog'}
                    className={`flex items-center gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 group ${
                        router.asPath.includes('/blog') ? 'sidebar-link-active' : ''
                    }`}
                    scroll={false}
                >
                    <BlogIcon className={`w-5 h-5 group-hover:fill-black ${router.asPath.includes('/blog') ? 'fill-black' : 'fill-white'}`} />
                    <p>Blog</p>
                </Link>
            </li>
            
        </>
    );
}

export default ClientSidebarLinks;