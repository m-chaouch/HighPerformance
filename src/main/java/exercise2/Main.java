package exercise2;

public class Main {
    public static void main(String[] args) {
        ManageSalesmen m = new ManageSalesmen();
        SalesMan s1 = new SalesMan("Ömer","Suezen",321);
        m.login();
        m.createSalesMan(s1);
        System.out.println((m.querySalesMan("id","21")).toString());  //wichtig: Der Array wird leer sein, weil die querySalesMan zwei Strings erwartet und man so nicht nach zahlen suchen kann.



    }
}
