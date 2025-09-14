import { Chart } from "../cmps/Chart.jsx";


export function Dashboard() {
    return (
        <section>
            <h2>Dashboard</h2>
            <h3>Statistic for 20 books</h3>
            <h4>By Category</h4>
            <Chart />
            <h4>By Max Price</h4>
            <Chart />
        </section>
    )
}