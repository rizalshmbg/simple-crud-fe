import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// membuat provider authentikasi dengan menggunakan context yang telah dibuat sblmnya
export const AuthContext = createContext();

//Membuat provider otentikasi dengan menggunakan context yang telah dibuat sebelumnya
export const AuthProvider = ({ children }) => {
	// menggunakan useState untuk menyimpan status authentikasi berdasarkan keberadaan token di cookies
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!Cookies.get('token')
	);

	// menggunakan useEffect untuk memantau perubahan pada token di cookies
	useEffect(() => {
		// membuat func handleTokenChange untuk memperbarui status authentikasi ketika token di cookies berubah
		const handleTokenChange = () => {
			setIsAuthenticated(!!Cookies.get('token'));
		};

		// menambahkan event listener pada storage untuk memantau perubahan pada token
		window.addEventListener('storage', handleTokenChange);

		// mengembalikan sebuah fungsi yg akan dipanggil saat komponen di-unmount untuk membersihkan event listener
		return () => {
			window.removeEventListener('storage', handleTokenChange);
		};
	}, []);

	// mengembalikan provider dengan nilai isAuthenticated dan setIsAuthenticated yg di peroleh dari useState
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
