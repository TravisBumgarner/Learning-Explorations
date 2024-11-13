extends Control

var counter = 0
var counter_2 = 0
var save_path = "user://variable.save"

@onready var increment = $Increment
@onready var decrement = $Decrement
@onready var value = $Value
@onready var value_2 = $Value2
@onready var save = $SaveFull

@onready var restore = $Restore


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.



func _on_increment_pressed():
	counter += 1 # Replace with function body.
	counter_2 += 1



func _on_decrement_pressed():
	counter -= 1
	counter_2 -= 1

func _process(delta):
	value.text = str(counter)
	value_2.text = str(counter_2)

func save_partial_game():
	print('partial save')
	var file = FileAccess.open(save_path, FileAccess.READ_WRITE)
	file.store_var(counter)

func save_full_game():
	print('full save')
	var file = FileAccess.open(save_path, FileAccess.WRITE)
	file.store_var(counter)
	file.store_var(counter_2)

func load_game():
	if FileAccess.file_exists(save_path):
		var file = FileAccess.open(save_path, FileAccess.READ)
		counter = file.get_var(counter)
		counter_2 = file.get_var(counter_2)
	else:
		print('no save')
		counter = 0

func _on_full_save_pressed():

	save_full_game()
	
func _on_restore_pressed():
	load_game()


func _on_save_partial_pressed():
	save_partial_game()
