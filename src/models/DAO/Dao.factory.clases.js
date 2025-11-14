import DoctorsDAO from "./Doctors.model.js"

class DoctorsFactory {
    static create(type) {
        switch (type) {
            case "MongoDB":
                console.log("Persistiendo en MongoDB.");
                return new DoctorsDAO();
            default:
                console.log("Persistiendo en MongoDB default.");
                return new DoctorsDAO();
        }
    }
}

export default DoctorsFactory;