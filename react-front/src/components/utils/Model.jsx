const Model = ({ open, children }) => {
    return (
        <>
            {open &&
                <>
                    <div className="modal-overlay" ></div>
                    <div className="model-dialog">
                        {children}
                    </div>
                </>
            }
        </>
    )
}

export default Model
