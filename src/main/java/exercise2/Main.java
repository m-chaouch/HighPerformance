package exercise2;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean flag = false;
        String passwort = "";
        boolean logflag = false;
        System.out.println("Passwort für die Datenbank:");
        while (scanner.hasNextLine()) {//Was soll nach dem schreiben und dem lesen passieren?
                if(!flag){
                    passwort = scanner.nextLine();
                }
                if(!passwort.equals("q7Jibjcj4t2ORk7D")){   //Hier muss das Passwort stehen, dass zu dem Link gehört!!
                    System.out.println("Das Passwort ist falsch. Bitte nochmal versuchen.");
                    continue;
                }else{
                    flag = true;
                    ManageSalesmen m = new ManageSalesmen();
                    m.login(passwort);
                    if(!logflag){       //damit folgendes nur EINMAL angezeigt wird.
                        System.out.println("Sie sind nun eingeloggt.");
                        logflag = true;
                    }
                    System.out.println("Wollen Sie die Salesmen-Daten lesen, schreiben, updaten oder löschen?");
                    String s = scanner.next();
                    if(s.equals("lesen")){
                        System.out.println("Geben sie die ID des SalesMan ein:");
                        int id = scanner.nextInt();
                        SalesMan abfrage = m.readSalesMan(id);
                        System.out.println("gefundener SalesMan:");
                        System.out.println(abfrage.getFirstname() +" "+ abfrage.getLastname() +" "+ abfrage.getId());
                    }
                    if(s.equals("schreiben")){
                        System.out.println("Vorname:");
                        String firstname = scanner.next();
                        System.out.println("Nachname:");
                        String lastname = scanner.next();
                        System.out.println("ID:");
                        int id = scanner.nextInt();
                        SalesMan salesManinsert = new SalesMan(firstname,lastname,id);
                        m.createSalesMan(salesManinsert);
                        System.out.println("Der SalesMan wurde erfolgreich eingetragen!");
                    }
                    if(s.equals("updaten")){
                        System.out.println("Welches Attribut soll geändert werden?");
                        String attr = scanner.next();
                        System.out.println("Welcher Wert dieses Attributs soll geändert werden?");
                        String oldVal = scanner.next();
                        System.out.println("Zu welchem Wert soll der Wert des Attributs geändert werden?");
                        String newVal = scanner.next();
                        m.updateSalseMan(attr,oldVal,newVal);
                        System.out.println("Der SalesMan wurde erfolgreich geupdatet!");
                    }
                    if(s.equals("löschen")){
                        System.out.println("Zu welchem Attribut gehört der zu löschende Wert?");
                        String attr = scanner.next();
                        System.out.println("Welcher Wert dieses Attributs soll gelöscht werden?");
                        String val = scanner.next();
                        m.deleteSalseMan(attr,val);
                        System.out.println("Der SalesMan wurde erfolgreich gelöscht!");
                    }
                }
        }
        System.out.println("ENDE");
    }
}
