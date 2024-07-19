extends Node

@onready var label = $Label


# Called when the node enters the scene tree for the first time.
func _ready():
	label.text = "Hello World"
	label.modulate = Color.LIGHT_SEA_GREEN

func _input(event):
	if(event.is_action_pressed("my_action")):
		label.modulate = Color.DARK_RED
	
	if(event.is_action_released("my_action")):
		label.modulate = Color.LIGHT_SEA_GREEN
		
	
