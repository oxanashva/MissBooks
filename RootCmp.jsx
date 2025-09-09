
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { NotFound } from "./pages/NotFound.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { GoogleBookAdd } from "./cmps/GoogleBookAdd.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"

const { Routes, Route, Navigate, HashRouter: Router } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/books" element={<BookIndex />}>
                            <Route path="add-book" element={<BookEdit />} />
                            <Route path="add-google-book" element={<GoogleBookAdd />} />
                            <Route path="edit/:bookId" element={<BookEdit />} />
                        </Route>
                        <Route path="/books/:id" element={<BookDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </section>
            <UserMsg />
        </Router>
    )
}