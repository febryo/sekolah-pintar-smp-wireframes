
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import { id } from "date-fns/locale";
import type { SchoolEvent } from './SchoolEvents';

interface EventCalendarProps {
  events: SchoolEvent[];
  onEventClick: (event: SchoolEvent) => void;
}

const EventCalendar = ({ events, onEventClick }: EventCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      extracurricular: 'bg-green-100 text-green-800',
      holiday: 'bg-red-100 text-red-800',
      meeting: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '';
    }
  };

  // Custom day content to show event indicators
  const renderDay = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    const hasEvents = dayEvents.length > 0;
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span>{format(date, 'd')}</span>
        {hasEvents && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-blue-500"
                title={event.title}
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" title={`+${dayEvents.length - 3} more`} />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {format(currentMonth, 'MMMM yyyy', { locale: id })}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full"
              components={{
                Day: ({ date, ...props }) => (
                  <div {...props}>
                    {renderDay(date)}
                  </div>
                )
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: id }) : 'Pilih Tanggal'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-3">
                {getEventsForSelectedDate().length === 0 ? (
                  <p className="text-sm text-gray-500">Tidak ada acara pada tanggal ini</p>
                ) : (
                  getEventsForSelectedDate().map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <span className="text-xs">{getPriorityIcon(event.priority)}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.startTime} - {event.endTime}
                        </div>
                        
                        {event.location && (
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        )}
                        
                        <Badge variant="secondary" className={`text-xs ${getTypeColor(event.type)}`}>
                          {event.type === 'academic' ? 'Akademik' :
                           event.type === 'extracurricular' ? 'Ekstrakurikuler' :
                           event.type === 'holiday' ? 'Libur' :
                           event.type === 'meeting' ? 'Rapat' : 'Lainnya'}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Pilih tanggal untuk melihat acara</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acara Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {events
                .filter(event => {
                  const eventDate = event.date;
                  return eventDate >= startOfMonth(currentMonth) && eventDate <= endOfMonth(currentMonth);
                })
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => onEventClick(event)}
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {format(event.date, 'dd MMM')} • {event.startTime}
                      </p>
                    </div>
                    <span className="text-xs">{getPriorityIcon(event.priority)}</span>
                  </div>
                ))}
              
              {events.filter(event => {
                const eventDate = event.date;
                return eventDate >= startOfMonth(currentMonth) && eventDate <= endOfMonth(currentMonth);
              }).length === 0 && (
                <p className="text-sm text-gray-500">Tidak ada acara bulan ini</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
