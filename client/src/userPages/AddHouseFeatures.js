import { Field } from 'formik';

const AddHouseFeatures = () => {
    return (
        <>
            <div className="row mb-2">
                <h2 className="col-form-label col-sm-2"></h2>
                <h2 className="col-form-label col-sm-10">Main Features</h2>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Bedrooms</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="bedrooms" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Drawing Room</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="drawingroom" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Bathrooms</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="bathrooms" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Dining Room</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="diningroom" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Servant Quarters</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="servantquarters" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Study Room</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="studyroom" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Electricity Backup</label>
                <div className="col-sm-4">
                    <Field className="form-select" name="electricitybackup" as="select">
                        <option value="none">None</option>
                        <option value="geneter">Geneter</option>
                        <option value="ups">UPS</option>
                        <option value="solar">Solar</option>
                    </Field>
                </div>
                <label className="col-form-label col-sm-2 label-right">Prayer Room</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="prayer_room" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Flooring</label>
                <div className="col-sm-4">
                    <Field className="form-select" name="flooring" as="select">
                        <option value="none">Select</option>
                        <option value="tiles">Tiles</option>
                        <option value="marbles">Marbles</option>
                        <option value="wooden">Wooden</option>
                        <option value="chip">Chip</option>
                    </Field>
                </div>
                <label className="col-form-label col-sm-2 label-right">Gym</label>
                <div className="col-sm-4">
                    <Field className="form-check-input" type="checkbox" name="gym" value="yes" />
                </div>
            </div>
            <div className="row mb-2">
                <h2 className="col-form-label col-sm-2"></h2>
                <h2 className="col-form-label col-sm-10">Nearby Locations and Other Facilities</h2>
            </div>
            <div className="row mb-2">
                <label className="col-form-label col-sm-2 label-right">Nearby Schools</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="nearbyschoole" />
                </div>
                <label className="col-form-label col-sm-2 label-right">Nearby Hospitals</label>
                <div className="col-sm-4">
                    <Field type="text" className="form-control" name="nearbyhospital" />
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
export default AddHouseFeatures;