import datetime 

class ConvertDateToDateTime:
    def __init__(self, date_start=None, date_end=None):
        self.date_start = date_start
        self.date_end = date_end

        if self.date_end and self.date_start:
            date_object_start = datetime.datetime.strptime(
                self.date_start, "%Y-%m-%d").date()
            date_object_end = datetime.datetime.strptime(
                self.date_end, "%Y-%m-%d").date()
            self.today_min = datetime.datetime.combine(
                date_object_start, datetime.time.min)
            self.today_max = datetime.datetime.combine(
                date_object_end, datetime.time.max)
        elif self.date_start:
            date_object = datetime.datetime.strptime(
                self.date_start, "%Y-%m-%d").date()
            self.today_min = datetime.datetime.combine(
                date_object, datetime.time.min)
            self.today_max = datetime.datetime.combine(
                date_object, datetime.time.max)

    def converted_min(self):
        return self.today_min

    def converted_max(self):
        return self.today_max