# PixelCell: Image to Excel Artist 🎨📊

این پروژه تصاویر شما را به آثار هنری در اکسل تبدیل می‌کند. هر سلول اکسل مانند یک پیکسل رنگ‌آمیزی می‌شود.

## 👤 سازنده و ایده پرداز
- **امیرسامان پیرایش‌فر (AmirSaman Pirayeshfar)**

---

## 🐍 راهنمای کامل ساخت برنامه ویندوزی (نسخه پایدار)

اگر فایل EXE قبلی شما سریع بسته می‌شد، به این دلیل بود که کتابخانه‌های مورد نیاز نصب نبودند یا خطایی در کنسول رخ می‌داد. نسخه زیر دارای **رابط گرافیکی** است و مشکل بسته شدن را ندارد.

### مرحله ۱: نصب پیش‌نیازها
ابتدا مطمئن شوید پایتون روی سیستم نصب است. سپس این دستور را در CMD بزنید تا کتابخانه‌های لازم نصب شوند:
```bash
pip install Pillow openpyxl pyinstaller
```

### مرحله ۲: کد نهایی برنامه (`pixel_art_app.py`)
این کد را در یک فایل به همین نام ذخیره کنید:

```python
import os
import sys
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image
import openpyxl
from openpyxl.utils import get_column_letter
from openpyxl.styles import PatternFill

# تابع اصلی تبدیل
def convert_image(image_path, width):
    try:
        img = Image.open(image_path)
        aspect_ratio = img.height / img.width
        height = int(width * aspect_ratio)
        
        img = img.resize((width, height), Image.Resampling.NEAREST)
        img = img.convert('RGB')

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Pixel Art"

        for y in range(height):
            for x in range(width):
                r, g, b = img.getpixel((x, y))
                hex_color = '{:02x}{:02x}{:02x}'.format(r, g, b).upper()
                cell = ws.cell(row=y+1, column=x+1)
                cell.fill = PatternFill(start_color=hex_color, end_color=hex_color, fill_type='solid')
                if y == 0:
                    ws.column_dimensions[get_column_letter(x+1)].width = 2.5
            ws.row_dimensions[y+1].height = 15

        output_path = os.path.splitext(image_path)[0] + "_excel_art.xlsx"
        wb.save(output_path)
        return True, output_path
    except Exception as e:
        return False, str(e)

# رابط کاربری گرافیکی
class App:
    def __init__(self, root):
        self.root = root
        self.root.title("PixelCell - Image to Excel")
        self.root.geometry("400x300")
        
        tk.Label(root, text="PixelCell Desktop", font=("Arial", 16, "bold")).pack(pady=10)
        tk.Label(root, text="Resolution (Width):").pack()
        
        self.width_entry = tk.Entry(root, justify='center')
        self.width_entry.insert(0, "60")
        self.width_entry.pack(pady=5)
        
        self.btn = tk.Button(root, text="Select Image & Convert", command=self.process, 
                             bg="#2563eb", fg="white", font=("Arial", 10, "bold"), padx=20, pady=10)
        self.btn.pack(pady=20)
        
        self.status = tk.Label(root, text="Ready", fg="gray")
        self.status.pack(side="bottom", pady=10)

    def process(self):
        file_path = filedialog.askopenfilename(filetypes=[("Images", "*.jpg *.png *.jpeg *.webp")])
        if not file_path: return
        
        try:
            w = int(self.width_entry.get())
        except:
            messagebox.showerror("Error", "Please enter a valid number for width.")
            return

        self.status.config(text="Processing...", fg="blue")
        self.root.update()
        
        success, msg = convert_image(file_path, w)
        if success:
            self.status.config(text="Success!", fg="green")
            messagebox.showinfo("Done", f"Excel file created at:\n{msg}")
        else:
            with open("error_log.txt", "w") as f: f.write(msg)
            messagebox.showerror("Error", f"Failed! Error details saved to error_log.txt")

if __name__ == "__main__":
    try:
        root = tk.Tk()
        app = App(root)
        root.mainloop()
    except Exception as e:
        with open("crash_log.txt", "w") as f: f.write(str(e))
```

### مرحله ۳: تبدیل به EXE (بدون بسته شدن ناگهانی)
در همان مسیری که فایل را ذخیره کردید، CMD را باز کنید و دقیقاً این دستور را بزنید:

```bash
pyinstaller --onefile --noconsole pixel_art_app.py
```

**نکات مهم:**
1.  **--noconsole:** باعث می‌شود آن پنجره سیاه ترمینال اصلاً باز نشود و مستقیماً پنجره گرافیکی برنامه نمایش داده شود.
2.  **خروجی:** بعد از اتمام دستور، فایل EXE شما در پوشه‌ای به نام **dist** ساخته می‌شود.
3.  **عیب‌یابی:** اگر باز هم اجرا نشد، به دنبال فایلی به نام `crash_log.txt` در کنار برنامه بگردید؛ من کد را طوری نوشتم که اگر برنامه کرش کند، دلیلش را در آن فایل بنویسد.
