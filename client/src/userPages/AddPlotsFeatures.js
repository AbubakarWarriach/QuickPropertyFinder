import { Field } from 'formik';

const AddPlotFeatures = () => {
    return (
        <>
            <div className="row mb-2">
                <h2 className="col-form-label col-sm-2"></h2>
                <h2 className="col-form-label col-sm-10">Main Features</h2>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Sewerage</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="sewerage" value="yes" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Electricity</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="drawingroom" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Water Supply</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="watersupply" value="yes" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Sui Gas</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="suigas" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
            <label className="col-form-label col-sm-2 label-right">Nearby Schools</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="nearbyschoole" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Boundary Wall</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="boundarywall" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Nearby Shopping Malls</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="nearbyshoppingmalls" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Nearby Restaurants</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="nearbyrestaurants" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Distance From Airport (kms)</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="distanceairport" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Nearby Public Transport Service</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="nearbypublictransport" />
                </div>
            </div>
        </>
    )
}
export default AddPlotFeatures;