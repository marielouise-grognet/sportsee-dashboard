

function Nutriment ( {type, value, icon, unity}) {
    return (
        
        <div className="card">
            <img className='icon' src={icon} alt ={`${type}`} />
            <div className="content">
                <p className="value-content">{value}{unity}</p>
                <p className="type-content">{type}</p>
            </div>

        </div>
    )
};

export default Nutriment