extends Area2D

func _on_body_entered(body):
	print("enter")
	queue_free()
