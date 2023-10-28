package exercise2;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String passwort = "";
        System.out.println("Sie sind nun eingeloggt.");
//        System.out.println("Wollen Sie die Salesmen-Daten lesen, schreiben, updaten oder löschen?");
        System.out.println("Wollen Sie Zugriff auf die Salesmen-Daten oder auf die Performance-Records?");
        while (scanner.hasNextLine()) {//Was soll nach dem schreiben und dem lesen passieren?
            String s = scanner.next();
            if(s.equals("Salesmen-Daten")) {
                System.out.println("Wollen Sie die Salesmen-Daten lesen, schreiben, updaten oder löschen?");
                ManageSalesmen m = new ManageSalesmen();
                m.login();
                s = scanner.next();
                if (s.equals("lesen")) {
                    System.out.println("Geben sie die ID des SalesMan ein:");
                    int id = scanner.nextInt();
                    SalesMan abfrage = m.readSalesMan(id);
                    System.out.println("gefundener SalesMan:");
                    System.out.println(abfrage.getFirstname() + " " + abfrage.getLastname() + " " + abfrage.getId());
                    System.out.println("\n");
                }
                else if (s.equals("schreiben")) {
                    System.out.println("Vorname:");
                    String firstname = scanner.next();
                    System.out.println("Nachname:");
                    String lastname = scanner.next();
                    System.out.println("ID:");
                    int id = scanner.nextInt();
                    SalesMan salesManinsert = new SalesMan(firstname, lastname, id);
                    m.createSalesMan(salesManinsert);
                    System.out.println("Der SalesMan wurde erfolgreich eingetragen!");
                }
                else if (s.equals("updaten")) {
                    System.out.println("Welches Attribut soll geändert werden?");
                    String attr = scanner.next();
                    System.out.println("Welcher Wert dieses Attributs soll geändert werden?");
                    String oldVal = scanner.next();
                    System.out.println("Zu welchem Wert soll der Wert des Attributs geändert werden?");
                    String newVal = scanner.next();
                    m.updateSalseMan(attr, oldVal, newVal);
                    System.out.println("Der SalesMan wurde erfolgreich geupdatet!");
                }
                else if (s.equals("löschen")) {
                    System.out.println("Zu welchem Attribut gehört der zu löschende Wert?");
                    String attr = scanner.next();
                    System.out.println("Welcher Wert dieses Attributs soll gelöscht werden?");
                    String val = scanner.next();
                    m.deleteSalseMan(attr, val);
                    System.out.println("Der SalesMan wurde erfolgreich gelöscht!");
                }
                else{
                    System.out.println("Bitte \"lesen\", \"schreiben\", \"updaten\" oder \"löschen\" auswählen! ");
                }
            }else if(s.equals("Performance-Records")){
                System.out.println("Wollen sie Performance Records schreiben oder lesen?");
                s = scanner.next();
                if(s.equals("schreiben")){

                }
                else if(s.equals("lesen")){

                }
                else{
                    System.out.println("Bitte \"lesen\" oder \"schreiben\" auswählen!");

                }
            }else{
                System.out.println("Bitte \"Salesmen-Daten\" oder \"Performance-Records\" auswählen!");
            }
            System.out.println("Wollen Sie Zugriff auf die Salesmen-Daten oder auf die Performance Records?");
        }
        System.out.println("ENDE");
    }
}
