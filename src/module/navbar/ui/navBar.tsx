import {Outlet, useLocation, useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ThemeContext from "../../../shared/theme";

export const chatUsers = [
    {
        id: 1,
        name: "Айдана",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s",
        check: true,
    },
    {
        id: 2,
        name: "Руслан",
        avatar: "https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png",
        check: true,
    },
    {
        id: 3,
        name: "Мария",
        avatar: "https://miro.medium.com/v2/resize:fit:1000/1*tiIzBo_gDUnc_4UfY-MCKA.jpeg",
        check: true,
    },
    {
        id: 6,
        name: "AI Assistant",
        isAI: true,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
        check: true,
    },
    {
        id: 4,
        name: "Данияр",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHvdvBup9Dy87O5z26jzufvPYyzdXwd7wZw&s",
        check: false,
    },
    {
        id: 5,
        name: "Камилла",
        avatar: "https://i.pinimg.com/736x/26/db/8e/26db8e1bc9a0eb238e69ae7d01a24fee.jpg",
        check: false,
    },
    {
        id: 7,
        name: "Эмир",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UISlC-svKGxLkicDl4OczwkyidR3_wwv-Q&s",
        check: false,
    },
    {
        id: 8,
        name: "Нурай",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaj8dygYNAVcMTFuIJRkAqK_n_PVoL_n4P4g&s",
        check: false,
    },
    {
        id: 9,
        name: "Тимур",
        avatar: "https://lh3.googleusercontent.com/hwau7OVWx96XaME5KpRuJ0I_MscrerK6SbRH1UwYHYaxIDQQtn7RZK02LDSfBzCreidFgDsJeXyqDct6EZiH6vsV=s1280-w1280-h800",
        check: false,
    },
    {
        id: 10,
        name: "Жанна",
        avatar: "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-schmidt-1000-pieces-random-galaxy.webp",
        check: false,
    },
    {
        id: 11,
        name: "Ильяс",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1hZxkl7aLUy170veFH3FI9uDbkqoSBjMY2A&s",
        check: true
    },
    {
        id: 12,
        name: "Лаура",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBVPjkU4nUybhB7nOBiGpAWjUhnT-yB9uIwUNsKP9xaR0qvJ2f1GsXtCPfsu2F8nEwnoM&usqp=CAU",
        check: false,
    }
];


const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filterName, setFilterName] = useState("");
    const [isFiltering, setIsFiltering] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        if (location.pathname === "/" && chatUsers.length > 0) {
            navigate(`/${chatUsers[0].id}`);
        }
    }, [location.pathname, navigate]);

    const filteredUsers = chatUsers.filter((user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase())
    );
    const usersToRender = isFiltering ? filteredUsers : chatUsers;

    return (
        <div className="w-full h-screen relative">
            <button
                className="absolute top-4 left-4 z-50 md:hidden p-2 bg-gray-200 rounded"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>

            <article className={`flex h-full ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
                {/* Sidebar */}
                <aside className={`
                    fixed md:static z-40 top-0 left-0 h-full w-64
                    transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
                    transition-transform duration-300 ease-in-out
                    md:translate-x-0
                    p-4 md:p-6 flex-shrink-0 flex flex-col gap-y-2 overflow-y-auto
                    ${theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-500 text-black"}
                `}>
                    <input
                        type="text"
                        value={filterName}
                        onChange={(e) => {
                            setFilterName(e.target.value);
                            setIsFiltering(e.target.value.length > 0);
                        }}
                        placeholder="Поиск по имени"
                        className="border border-gray-300 rounded-lg bg-white w-full p-2 text-sm"
                    />

                    {usersToRender.length > 0 ? (
                        usersToRender.map((user) => (
                            <NavLink
                                to={`/${user.id}`}
                                key={user.id}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 border rounded-md p-2 no-underline transition ${
                                        isActive
                                            ? "bg-red-500 text-white"
                                            : "bg-white text-black hover:bg-gray-200"
                                    }`
                                }
                            >
                                <img
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover"
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <span className="text-base md:text-lg">{user.name}</span>
                            </NavLink>
                        ))
                    ) : (
                        <p className="text-white text-sm">Пользователи не найдены</p>
                    )}
                </aside>

                <main className="flex-1 overflow-auto ml-0 md:ml-0">
                    <Outlet />
                </main>
            </article>
        </div>
    );
};

export default NavBar;