import pytz
from datetime import datetime

def time_now():
    saopaulo_tz = pytz.timezone('America/Sao_Paulo')
    utc_now = datetime.utcnow().replace(tzinfo=pytz.utc)
    return utc_now.astimezone(saopaulo_tz)