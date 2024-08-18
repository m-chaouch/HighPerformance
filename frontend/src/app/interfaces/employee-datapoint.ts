/**
 * Dieses Interface beschreibt die Struktur eines Datensatzes für einen Mitarbeiter.
 * Es definiert die Eigenschaften, die ein Mitarbeiterobjekt besitzen muss, wenn es
 * vom Backend empfangen oder innerhalb der Anwendung verwendet wird.
 */

export interface EmployeeDatapoint {
    employeeId: string;
    firstName: string;
    lastName: string;
    unit: string | null; // unit can be null, so it's good to handle it
}