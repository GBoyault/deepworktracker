import React, { ReactNode } from "react";

export class PeriodDuration {
  readonly tooShortLimit: number = 15;

  start: number;
  end: number | null;
  diffInMinuts: number;
  isTooShort: boolean;
  formattedDuration: ReactNode;

  constructor(start: number, end: number | null = null) {
    this.start = start;
    this.end = end;
    this.diffInMinuts = end ? Math.round((end - start) / 1000 / 60) : 0;
    this.isTooShort = !this.diffInMinuts || this.diffInMinuts < this.tooShortLimit;
    this.formattedDuration = PeriodDuration.formatDuration(this.diffInMinuts);
  }


  formattedStartToEnd = (): string => {
    const start = this.timestampToTime(this.start);
    const end = this.end ? this.timestampToTime(this.end) : 'N.D.';

    return `${start} - ${end}`;
  }


  timestampToTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }


  static formatDuration = (totalMinuts: number): ReactNode => {
    if (totalMinuts === 0) {
      return '-';
    }

    if (totalMinuts < 60) {
      return <>{totalMinuts} <small>min</small></>;
    }

    const hours = Math.floor(totalMinuts / 60);
    const minuts = totalMinuts % 60;

    if (minuts === 0) {
      return `${hours}h`;
    }

    if ( minuts < 10) {
      return `${hours}h0${minuts}`;
    }

    return `${hours}h${minuts}`;
  }
}