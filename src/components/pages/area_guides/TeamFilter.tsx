import React from 'react';

interface FormData {
    department: string;
}

interface DepartmentOption {
    value: string;
    label: string;
}

interface BlogFilterProps {
    formData: FormData;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    departments: DepartmentOption[];
}

const TeamFilter: React.FC<BlogFilterProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
    setFormData,
    departments,
}) => {
    const handleReset = () => {
        setFormData(() => {
            const resetFormData: FormData = {
                department: '',
            };

            const params = new URLSearchParams({});
            const basePath = window.location.pathname;
            const newUrl = `${basePath}?${params.toString()}`;

            window.history.pushState({}, '', newUrl);

            return resetFormData;
        });
    };

    return (
        <form onSubmit={handleSubmit} className="property-search-form " id="frmId" >
            <div className="form-group">
                <select
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    style={{minWidth:'300px'}}
                    className="form-control"
                >
                    {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                            {dept.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mx-srchbtn  hide d-none">
                <div className="d-flex justify-content-between gap-3">
                    
                    <button
                        type="button"
                        style={{ opacity: 0.6 }}
                        onClick={handleReset}
                        className="btn btn-default btn-reset hide d-none"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TeamFilter;
