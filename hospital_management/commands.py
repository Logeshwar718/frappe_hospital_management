import click

@click.command()
def hello():
    """Custom bench command"""
    click.echo("This is a custom bench command")

commands=[hello]