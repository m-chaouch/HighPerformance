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
                if(!passwort.equals("PASSWORT")){   //Hier muss das Passwort stehen, dass zu dem Link gehört!!
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
                    System.out.println("Wollen Sie die Salesmen-Daten lesen oder schreiben?");
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
                }
        }
        System.out.println("ENDE");
//        ManageSalesmen m = new ManageSalesmen();
//
//        SalesMan s1 = new SalesMan("Ömer","Suezen",321);
//        m.login();
//        m.createSalesMan(s1);
//        System.out.println((m.querySalesMan("id","21")).toString());  //wichtig: Der Array wird leer sein, weil die querySalesMan zwei Strings erwartet und man so nicht nach zahlen suchen kann.



    }
}
