"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import Image from "next/image";

type RsvpFormValues = {
  name: string;
  phone: string;
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
  phone: "",
  message: "",
  attendance: "",
  guests: "",
};
const giftInfo = {
  heroImage: "/2O4A0125.jpg",
  qrImage: "/vietqr-tran-thi-ngoc-yen.png",
  accountHolder: "Trần Thị Ngọc Yến",
  bankName: "Techcombank",
  bankCode: "970432",
  accountNumber: "8486071120",
} as const;
const formattedAccountNumber = giftInfo.accountNumber.replace(
  /\B(?=(\d{3})+(?!\d))/g,
  " "
);
export default function RsvpFormSection() {
  const [formValues, setFormValues] = useState<RsvpFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const placeholders = useMemo(
    () => ({
      name: "Nhập tên của bạn",
      phone: "Số điện thoại liên hệ",
      message: "Lời nhắn đến cô dâu chú rể…",
      attendance: "Bạn sẽ đến chứ",
      guests: "Số người tham dự",
    }),
    []
  );
  const showGuestSelect = formValues.attendance !== "not-coming";
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPhone = formValues.phone.trim();
    if (!trimmedPhone) {
      toast.error("Bạn vui lòng cho tụi mình xin số điện thoại nhé.");
      return;
    }
    if (!formValues.attendance) {
      toast.error('Bạn có đến dự hay không? Hãy cho tụi mình biết nhé!😊');
      return;
    }
    const requiresGuestCount = formValues.attendance === "coming";
    const guestCount = requiresGuestCount ? Number(formValues.guests) : 0;
    if (requiresGuestCount && !formValues.guests) {
      toast.error('Bạn vui lòng chọn số lượng khách đi cùng nhé.');
      return;
    }
    const payload = {
      name: formValues.name.trim(),
      phone: trimmedPhone,
      message: formValues.message.trim(),
      attendance: formValues.attendance,
      guests: guestCount,
    };
    setIsSubmitting(true);

    void fetch("/api/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error("RSVP_FORM_SUBMIT_ERROR", error);
    });

    window.setTimeout(() => {
      setIsSubmitting(false);
      setFormValues(initialValues);
      payload.attendance === "coming"
        ? toast.success('Cảm ơn bạn đã gửi lời nhắn. Hẹn gặp bạn tại lễ cưới nhé!')
        : toast.success(
            'Mình cũng rất tiếc khi bạn không thể đến chung vui cùng chúng mình. Hẹn gặp bạn vào dịp khác nhé! '
          );
    }, 1000);
  };
  const updateField = <K extends keyof RsvpFormValues>(
    field: K,
    value: RsvpFormValues[K]
  ) => {
    setFormValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "attendance") {
        const attendanceValue = value as RsvpFormValues["attendance"];
        next.guests =
          attendanceValue === "not-coming" ? "" : next.guests || "1";
      }
      return next;
    });
  };
  return (
    <section
      id="rsvp"
      data-scroll-section="true"
      className="bg-linear-to-b from-rose-50/70 via-white to-rose-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="rounded-xl border border-rose-100/70 bg-white/90 p-6 shadow-[0_35px_60px_-15px_rgba(244,114,182,0.15)] backdrop-blur">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">
              HOÀNG LONG & NGỌC YẾN
            </p>
            <h2 className="font-serif text-2xl text-slate-800 sm:text-3xl">Gửi lời yêu thương</h2>
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
                onChange={(event) => updateField('name', event.target.value)}
                className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
                autoComplete="name"
                required

              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="rsvp-phone"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200"
              >
                Số điện thoại
              </label>
              <Input
                id="rsvp-phone"
                type="tel"
                placeholder={placeholders.phone}
                value={formValues.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
                autoComplete="tel"
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
                onChange={(event) => updateField('message', event.target.value)}
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
                  onValueChange={(value) => updateField('attendance', value)}

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
              {showGuestSelect && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200">
                    Số Lượng
                  </span>
                  <Select
                    value={formValues.guests}
                    onValueChange={(value) => updateField('guests', value)}
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
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-rose-400 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-rose-200 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                <span>Gửi lời nhắn cho dâu rể</span>
              </Button>
              <Dialog >
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-xl border-rose-100/90 bg-white/90 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400 shadow-sm hover:bg-rose-50"
                  >
                    GỬI QUÀ MỪNG CƯỚI
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-md overflow-hidden rounded-3xl border border-rose-100/80 bg-white/95 p-0 shadow-[0_38px_80px_-38px_rgba(244,114,182,0.85)]">
                  <div className="relative h-64 w-full sm:h-60">
                    <Image
                      src={giftInfo.heroImage}
                      alt="Hình cưới của cô dâu chú rể"
                      fill
                      sizes="(max-width: 767px) 100vw, 480px"
                      className="object-cover"
                      priority={false}
                      // unoptimized
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white via-white/40 to-transparent" />
                  </div>
                  <div className="space-y-6 px-6 pb-8 pt-6">
                    <DialogHeader className="space-y-2 text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.5em] text-rose-300">
                        Gửi quà mừng cưới
                      </p>
                      <DialogDescription className="text-sm text-muted-foreground">
                        Cảm ơn bạn đã gửi lời chúc và món quà yêu thương tới tụi mình.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="rounded-2xl border border-rose-100/80 bg-white/95 p-5 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.55)]">
                      <div className="mx-auto w-40 max-w-full sm:w-48">
                        <div className="relative my-1 aspect-square">
                          <Image
                            src={giftInfo.qrImage}
                            alt="Mã QR Techcombank Trần Thị Ngọc Yến"
                            fill
                            sizes="(max-width: 767px) 75vw, 320px"
                            className="object-contain"
                            priority={false}
                            unoptimized
                          />
                        </div>
                      </div>
                      {/* <div className="mt-4 space-y-1 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">
                          {giftInfo.bankName} - {giftInfo.bankCode}
                        </p>
                        <p className="text-lg font-semibold text-slate-800">
                          {giftInfo.accountHolder}
                        </p>
                        <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                          Số tài khoản
                        </p>
                        <p className="font-mono text-xl tracking-[0.35em] text-slate-900">
                          {formattedAccountNumber}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
