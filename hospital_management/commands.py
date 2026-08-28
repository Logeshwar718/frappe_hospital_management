import click

@click.command()
def hello():
    """Custom bench command"""
    click.echo("This is a custom bench command")

@click.command("hello-app")
def hello_app():
    """This is a custom bench command hello-app"""
    click.echo("Hello from custom command!")

commands = [hello,hello_app]