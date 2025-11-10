"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type RsvpFormValues = {
  name: string;
  message: string;
  attendance: string;
  guests: string;
};

const attendanceOptions = [
  { value: "coming", label: "Chắc chắn mình sẽ đến rồi!" },
  { value: "not-coming", label: "Mình bận mất rồi…" },
] as const;

const guestOptions = [
  { value: "1", label: "1 người" },
  { value: "2", label: "2 người" },
  { value: "3", label: "3 người" },
  { value: "4", label: "4 người" },
] as const;

const initialValues: RsvpFormValues = {
  name: "",
  message: "",
  attendance: "",
  guests: "",
};

export default function RsvpFormSection() {
  const [formValues, setFormValues] = useState<RsvpFormValues>(initialValues);
  const placeholders = useMemo(
    () => ({
      name: "Nhập tên của bạn",
      message: "Lời nhắn đến cô dâu chú rể…",
      attendance: "Bạn sẽ đến chứ",
      guests: "Số người tham dự",
    }),
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("RSVP_FORM_SUBMISSION", formValues);
  };

  const updateField = <K extends keyof RsvpFormValues>(
    field: K,
    value: RsvpFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="rsvp"
      data-scroll-section="true"
      className="bg-gradient-to-b from-rose-50/70 via-white to-rose-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="rounded-xl border border-rose-100/70 bg-white/90 p-6 shadow-[0_35px_60px_-15px_rgba(244,114,182,0.15)] backdrop-blur">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">
              RSVP FORM
            </p>
            <h2 className="font-serif text-2xl text-slate-800 sm:text-3xl">
              Gửi lời nhắn yêu thương
            </h2>
            <p className="text-sm text-muted-foreground">
              Hãy xác nhận tham dự và viết đôi dòng dành tặng cô dâu chú rể nhé.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="rsvp-name"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200"
              >
                Họ và tên
              </label>
              <Input
                id="rsvp-name"
                placeholder={placeholders.name}
                value={formValues.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rsvp-message"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200"
              >
                Lời nhắn
              </label>
              <Textarea
                id="rsvp-message"
                placeholder={placeholders.message}
                value={formValues.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="min-h-[120px] rounded-xl border-rose-100/90 bg-white/90 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200">
                  Tham dự
                </span>
                <Select
                  value={formValues.attendance}
                  onValueChange={(value) => updateField("attendance", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-left text-sm text-slate-700 placeholder:text-slate-400 focus:ring-rose-200/50">
                    <SelectValue placeholder={placeholders.attendance} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-rose-100 bg-white/95 shadow-lg">
                    {attendanceOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-sm text-slate-700"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200">
                  Số lượng
                </span>
                <Select
                  value={formValues.guests}
                  onValueChange={(value) => updateField("guests", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-left text-sm text-slate-700 placeholder:text-slate-400 focus:ring-rose-200/50">
                    <SelectValue placeholder={placeholders.guests} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-rose-100 bg-white/95 shadow-lg">
                    {guestOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-sm text-slate-700"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="submit"
                className="h-12 rounded-xl bg-rose-400 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-rose-200 transition hover:bg-rose-500"
              >
                GỬI LỜI NHẮN &amp; XÁC NHẬN
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400 shadow-sm hover:bg-rose-50"
                  >
                    GỬI QUÀ MỪNG CƯỚI
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl border-rose-100 bg-white/95">
                  <DialogHeader className="space-y-2 text-center">
                    <DialogTitle className="font-serif text-2xl text-slate-800">
                      Tính năng đang phát triển
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                      Tính năng này đang phát triển. Chúng mình sẽ sớm mở gửi
                      quà trực tuyến nhé!
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
