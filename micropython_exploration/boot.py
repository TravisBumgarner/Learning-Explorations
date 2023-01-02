# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
import gc
import webrepl
import user_boot

webrepl.start()
gc.collect()
# user_boot.connect()
