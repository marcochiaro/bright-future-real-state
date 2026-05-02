import { HDate, HebrewCalendar, Event as HebcalEvent } from "@hebcal/core";
import { FechaHebrea } from "@/types";

export function getFechaHebrea(date: Date = new Date()): FechaHebrea {
  const hd = new HDate(date);

  const events = HebrewCalendar.getHolidaysOnDate(hd) || [];
  const festividad = events.length > 0 ? events[0].render("es") || events[0].render("en") : null;

  return {
    fechaHebrea: `${hd.getDate()} ${getNombreMesHebreo(hd.getMonth(), hd.isLeapYear())} ${hd.getFullYear()}`,
    mes: getNombreMesHebreo(hd.getMonth(), hd.isLeapYear()),
    anio: hd.getFullYear(),
    festividad,
  };
}

function getNombreMesHebreo(month: number, isLeap: boolean): string {
  const meses: Record<number, string> = {
    1: "Nisan",
    2: "Iyar",
    3: "Sivan",
    4: "Tamuz",
    5: "Av",
    6: "Elul",
    7: "Tishrei",
    8: "Jeshvan",
    9: "Kislev",
    10: "Tevet",
    11: "Shevat",
    12: isLeap ? "Adar I" : "Adar",
    13: "Adar II",
  };
  return meses[month] || "";
}

export function getFestividadesProximas(date: Date = new Date(), count: number = 5) {
  const hd = new HDate(date);
  const year = hd.getFullYear();

  const options = {
    year,
    isHebrewYear: true,
    candlelighting: false,
    sedrot: false,
    omer: false,
    noMinorFast: true,
    noModern: true,
  };

  const events = HebrewCalendar.calendar(options);
  const futureEvents = events
    .filter((ev: HebcalEvent) => ev.getDate().greg().getTime() >= date.getTime())
    .slice(0, count)
    .map((ev: HebcalEvent) => ({
      nombre: ev.render("es") || ev.render("en"),
      fecha: ev.getDate().greg(),
      fechaHebrea: `${ev.getDate().getDate()} ${getNombreMesHebreo(
        ev.getDate().getMonth(),
        ev.getDate().isLeapYear()
      )}`,
    }));

  return futureEvents;
}
