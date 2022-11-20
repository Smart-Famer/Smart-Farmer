export default function PhotoContainer({timestamp, metadata, url}){
    return(
        <div className="col-12 col-md-6 mb-4">
        <div className="row">
          <div className="col">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Date
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              id="staticEmail"
              value={new Date(timestamp).toLocaleDateString().replace('/','-')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Time
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              id="staticEmail"
              value={new Date(timestamp).toLocaleTimeString()}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Camera Angle
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              disabled
              className="form-control-plaintext"
              id="staticEmail"
              value={metadata.camera_angle}
            />
          </div>
        </div>
        <div className="row mt-1">
          <img className="w-75" src={url} alt="farmImage1" />
        </div>
      </div>

    )
}