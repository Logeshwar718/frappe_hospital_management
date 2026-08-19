import frappe
from frappe.query_builder import DocType


@frappe.whitelist()
def process_patients():

    Patient = DocType("Patient")
    Doctor = DocType("Doctor")

    #Query builder
    patients = (
        frappe.qb
        .from_(Patient)
        .join(Doctor)
        .on(Patient.doctor == Doctor.name)
        .select(
            Patient.name,
            Patient.patient_name,
            Patient.age,
            Patient.gender,
            Patient.doctor,
            Patient.status,
            Patient.processing_status,
            Doctor.doctor_name,
            Doctor.specialization
        )
        .where(Patient.status == "Active")
        .limit(5)
    ).run(as_dict=True)

    #Document API
    if patients:
        patient_doc = frappe.get_doc(
            "Patient",
            patients[0]["name"]
        )

        patient_doc.processing_status = "Reviewed"
        patient_doc.save()

    #Database API
    for patient in patients:
        frappe.db.set_value(
            "Patient",
            patient["name"],
            "status",
            "Inactive"
        )

    return patients