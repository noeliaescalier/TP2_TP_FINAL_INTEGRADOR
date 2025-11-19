import Doctor from "./Doctors.model.js";
import User from "./Users.model.js";
import ScheduleTemplate from './ScheduleTemplates.model.js';
import Appointment from "./Appointment.model.js";


const registry = {
  MongoDB: {
    Doctor: Doctor,
    User: User,
    ScheduleTemplate: ScheduleTemplate,
    Appointment: Appointment
  }
};

class DaoFactory {
  /**
   * Devuelve una instancia de DAO según el tipo y modelo solicitados.
   * @param {string} model
   * @param {string} [type=process.env.PERSISTENCE||'MongoDB']
   * @param {object} [deps={}] 
   */
  static get(model, type = process.env.PERSISTENCE || "MongoDB", deps = {}) {
    const persistence = registry[type];
    if (!persistence) throw new Error(`Persistencia no encontrada: ${type}`);

    const DaoClass = persistence[model];
    if (!DaoClass) throw new Error(`Modelo no encontrado: ${model} en ${type}`);

    return new DaoClass(deps);
  }

  static register(type, model, DaoClass) {
    registry[type] ??= {};
    registry[type][model] = DaoClass;
  }
}

export default DaoFactory;
