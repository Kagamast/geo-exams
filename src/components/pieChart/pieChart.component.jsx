import './pieChart.style.scss'

const PieChart = ({percentage, colorGradient}) => {
    const color = colorGradient.slice().reverse()[Math.ceil((percentage / 34) - 1)]
    return(
        <div className="pie-chart-wrap" style={{background: `conic-gradient(${color} ${percentage}%, transparent ${percentage}%)`}}>
            <div className="pie-chart-inside">
                {percentage + "%"}
            </div>
        </div>
    )
}

export default PieChart;