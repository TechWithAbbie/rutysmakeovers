import { useMemo, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  CalendarDays,
  Clock,
  Phone,
  AlertCircle,
  Home,
  MessageCircle,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// ── Services & Time ─────────────────────────────────────────
const serviceOptions = [
  "Bridal Makeup & Gele",
  "Hair Styling & Wigs",
  "Lashes & Lash Extensions",
  "Microblading",
  "Perfumes & Eye Lashes",
  "Event & Occasion Makeup",
];

const timeSlots = [
  "8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const bookingDetails = [
  { icon: CalendarDays, text: "Monday – Sunday (7 days a week)" },
  { icon: Clock,        text: "8:00 AM – 9:00 PM daily" },
  { icon: AlertCircle,  text: "Book at least 24 hours in advance" },
  { icon: AlertCircle,  text: "Cancel or reschedule with 24h notice" },
  { icon: MessageCircle,text: "Microblading & travel require consultation" },
  { icon: Home,         text: "Home service available — no deposit required" },
  { icon: Phone,        text: "Consultation via WhatsApp or phone call" },
];

// ── EmailJS Config ───────────────────────────────────────────
const SERVICE_ID      = "service_vgk9xhi";
const PUBLIC_KEY      = "y4gyD9__3AU2p4qCB";
const OWNER_TEMPLATE  = "template_hexcadp";
const CLIENT_TEMPLATE = "template_ljjt119";

// ── Component ────────────────────────────────────────────────
export default function BookingForm() {
  const today = new Date();

  const [viewMonth, setViewMonth]       = useState(today.getMonth());
  const [viewYear, setViewYear]         = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeOpen, setTimeOpen]         = useState(false);
  const [loading, setLoading]           = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [formData, setFormData]         = useState({
    name:    "",
    phone:   "",
    email:   "",
    service: "",
    message: "",
  });

  // ── Calendar ─────────────────────────────────────────────
  const calendarDays = useMemo(() => {
    const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewMonth, viewYear]);

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d <= t;
  };

  const isSelected = (day: number) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === viewMonth &&
    selectedDate?.getFullYear() === viewYear;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const formattedDate = selectedDate?.toLocaleDateString("en-US", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  // ── Reset ────────────────────────────────────────────────
  const reset = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    setSelectedDate(null);
    setSelectedTime("");
    setCalendarOpen(false);
    setTimeOpen(false);
  };

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.email || !formData.service) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const ownerParams = {
      client_name:  formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      service:      formData.service,
      date:         formattedDate,
      time:         selectedTime,
      message:      formData.message || "No additional message",
    };

    const clientParams = {
      to_email:    formData.email,
      client_name: formData.name,
      service:     formData.service,
      date:        formattedDate,
      time:        selectedTime,
      message:     formData.message || "No additional message",
    };

    try {
      await emailjs.send(SERVICE_ID, OWNER_TEMPLATE, ownerParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, CLIENT_TEMPLATE, clientParams, PUBLIC_KEY);
      setSubmitted(true);
      toast.success("Booking confirmed! Check your email.");
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success Screen ────────────────────────────────────────
  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center space-y-6 animate-fade-in-up">
            <CheckCircle className="w-16 h-16 mx-auto text-primary" />
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Booking Confirmed!
            </h2>
            <div className="bg-card rounded-2xl p-6 shadow-card text-left space-y-3">
              <p className="text-muted-foreground">
                Thank you <span className="text-primary font-semibold">{formData.name}</span>!
                Here is your booking summary:
              </p>
              <div className="border-t pt-3 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Service:</span>{" "}
                  <span className="text-muted-foreground">{formData.service}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Date:</span>{" "}
                  <span className="text-muted-foreground">{formattedDate}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Time:</span>{" "}
                  <span className="text-muted-foreground">{selectedTime}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Confirmation sent to:</span>{" "}
                  <span className="text-muted-foreground">{formData.email}</span>
                </p>
                {formData.message && (
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Your Message:</span>{" "}
                    <span className="text-muted-foreground">{formData.message}</span>
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Please check your inbox. Contact us at least 24 hours in advance to reschedule or cancel.
            </p>
            <Button variant="hero" onClick={reset}>
              Book Another Session
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ── Main Form ─────────────────────────────────────────────
  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — Info */}
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-gold">
              Schedule
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Book a Session
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Ready to glow? Pick a date and time, choose your service,
              and let us handle the rest. Walk-ins welcome but advance booking is preferred.
            </p>
            <div className="space-y-4 pt-4">
              {bookingDetails.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Calendar + Time + Form */}
          <div className="space-y-4">

            {/* Calendar */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <button
                type="button"
                onClick={() => setCalendarOpen(!calendarOpen)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      Select Date
                    </h4>
                    {selectedDate && (
                      <p className="text-sm text-primary font-medium">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "short",
                          month:   "short",
                          day:     "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${calendarOpen ? "rotate-180" : ""}`} />
              </button>

              {calendarOpen && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-1.5 rounded-lg hover:bg-blush transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {MONTHS[viewMonth]} {viewYear}
                    </h3>
                    <button
                      onClick={nextMonth}
                      className="p-1.5 rounded-lg hover:bg-blush transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => (
                      <div key={i} className="aspect-square flex items-center justify-center">
                        {day && (
                          <button
                            disabled={isDisabled(day)}
                            onClick={() => {
                              setSelectedDate(new Date(viewYear, viewMonth, day));
                              setCalendarOpen(false);
                              setTimeOpen(true);
                            }}
                            className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                              isSelected(day)
                                ? "bg-primary text-primary-foreground"
                                : isDisabled(day)
                                ? "text-muted-foreground/40 cursor-not-allowed"
                                : "text-foreground hover:bg-blush"
                            }`}
                          >
                            {day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time Slots */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <button
                type="button"
                onClick={() => setTimeOpen(!timeOpen)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      Select Time
                    </h4>
                    {selectedTime && (
                      <p className="text-sm text-primary font-medium">{selectedTime}</p>
                    )}
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${timeOpen ? "rotate-180" : ""}`} />
              </button>

              {timeOpen && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedTime(t);
                          setTimeOpen(false);
                        }}
                        className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedTime === t
                            ? "bg-primary text-primary-foreground"
                            : "bg-blush text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Details Form */}
            {selectedDate && selectedTime && (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-6 shadow-card space-y-4 animate-fade-in-up"
              >
                <h4 className="font-heading font-semibold text-foreground">
                  Your Details
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input
                      id="phone"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      maxLength={20}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Service *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(v) => setFormData({ ...formData, service: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="message">Additional Notes (Optional)</Label>
                  <textarea
                    id="message"
                    placeholder="Any special requests or additional information..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={500}
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.message.length}/500
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
